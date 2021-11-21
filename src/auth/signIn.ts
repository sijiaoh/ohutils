import type {User} from '@prisma/client';
import type {Profile} from 'passport';
import {prisma} from 'src/database/prisma';
import type {Request} from 'src/utils/Context';

export type VerifyCallback = (err?: string | Error | null, user?: User) => void;

const buildSocialProfile = <T>(userId: T, profile: Profile) => ({
  userId,
  provider: profile.provider,
  providerId: profile.id,
  email: profile.emails?.[0]?.value,
});

export async function signIn(req: Request, profile: Profile): Promise<User> {
  const socialProfile = await prisma.socialProfile.findUnique({
    where: {
      provider_providerId: {provider: profile.provider, providerId: profile.id},
    },
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
      await prisma.socialProfile.create({
        data: buildSocialProfile(req.user.id, profile),
      });
      return req.user;
    }
  }
  // Normal sign in.
  else if (socialProfile) {
    const user = await prisma.user.findUnique({
      where: {id: socialProfile.userId},
    });
    if (!user) throw new Error("Social profile's user not found.");
    return user;
  }
  // Sign up.
  else {
    const user = await prisma.user.create({
      data: {
        socialProfiles: {
          create: buildSocialProfile(undefined, profile),
        },
      },
    });

    return user;
  }
}
