import {NextApiRequest} from 'next';
import {Profile} from 'passport';
import {getManager} from 'typeorm';
import {SocialProfileEntity, UserEntity} from 'src/database/entities';

export type VerifyCallback = (
  err?: string | Error | null,
  user?: UserEntity
) => void;

const buildSocialProfile = (userId: string, profile: Profile) => ({
  userId,
  provider: profile.provider,
  providerId: profile.id,
  email: profile.emails?.[0]?.value,
});

export async function signIn(
  req: NextApiRequest,
  profile: Profile,
  done: VerifyCallback
) {
  const socialProfile = await SocialProfileEntity.findOne({
    where: {provider: profile.provider, providerId: profile.id},
  });

  // Already sing in.
  if (req.user) {
    // Check if social profile is correct.
    if (socialProfile) {
      if (req.user.id === socialProfile.userId) {
        done(undefined, req.user);
        return;
      } else {
        done(new Error('User is not a SocialProfile user.'));
        return;
      }
    }
    // Link new social profile.
    else {
      const err = await SocialProfileEntity.create(
        buildSocialProfile(req.user.id, profile)
      )
        .save()
        .then(() => undefined)
        .catch(err => err);
      done(err, err ? undefined : req.user);
      return;
    }
  }
  // Normal sign in.
  else if (socialProfile) {
    const user = await socialProfile.user;
    done(undefined, user);
    return;
  }
  // Sign up.
  else {
    const res = await getManager()
      .transaction(async entityManager => {
        const user = await entityManager.create(UserEntity).save();
        await entityManager
          .create(SocialProfileEntity, buildSocialProfile(user.id, profile))
          .save();
        return user;
      })
      .then(user => [undefined, user] as const)
      .catch(err => [err]);

    done(...res);
    return;
  }
}
