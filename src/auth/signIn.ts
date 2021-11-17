import type {Profile} from 'passport';
import {getManager} from 'typeorm';
import {SocialProfileEntity, UserEntity} from 'src/database/entities';
import type {Request} from 'src/utils/Context';

export type VerifyCallback = (
  err?: string | Error | null,
  user?: UserEntity
) => void;

export async function signIn(
  req: Request,
  profile: Profile
): Promise<UserEntity> {
  const socialProfile = await SocialProfileEntity.findOne({
    where: {provider: profile.provider, providerId: profile.id},
  });

  // Already sing in.
  if (req.user) {
    // Check if social profile is correct.
    if (socialProfile) {
      if (req.user.id === socialProfile.userId) {
        return req.user;
      } else {
        throw new Error('User is not a SocialProfile user.');
      }
    }
    // Link new social profile.
    else {
      await SocialProfileEntity.build({userId: req.user.id, profile}).save();
      return req.user;
    }
  }
  // Normal sign in.
  else if (socialProfile) {
    const user = await UserEntity.findOne(socialProfile.userId);
    if (!user) throw new Error("Social profile's user not found.");
    return user;
  }
  // Sign up.
  else {
    const user = await getManager().transaction(async entityManager => {
      const user = await entityManager.save(UserEntity.build());
      await entityManager.save(
        SocialProfileEntity.build({userId: user.id, profile})
      );
      return user;
    });

    return user;
  }
}
