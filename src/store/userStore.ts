import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/game';

interface UserState {
  users: User[];
  currentUser: User | null;
  addUser: (username: string | null) => void;
  updateUserPoints: (userId: string, points: Partial<User['points']>) => void;
  getLeaderboard: () => User[];
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,

      addUser: (username) => {
        const newUser: User = {
          id: Math.random().toString(36).slice(2),
          username,
          points: { earth: 0, space: 0, hand: 0, carbon: 0 },
          createdAt: Date.now(),
        };

        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser,
        }));

        return newUser;
      },

      updateUserPoints: (userId, newPoints) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  points: {
                    ...user.points,
                    ...Object.entries(newPoints).reduce(
                      (acc, [key, value]) => ({
                        ...acc,
                        [key]: (user.points[key as keyof User['points']] || 0) + (value || 0),
                      }),
                      {}
                    ),
                  },
                }
              : user
          ),
          currentUser:
            state.currentUser?.id === userId
              ? {
                  ...state.currentUser,
                  points: {
                    ...state.currentUser.points,
                    ...Object.entries(newPoints).reduce(
                      (acc, [key, value]) => ({
                        ...acc,
                        [key]: (state.currentUser!.points[key as keyof User['points']] || 0) + (value || 0),
                      }),
                      {}
                    ),
                  },
                }
              : state.currentUser,
        }));
      },

      getLeaderboard: () => {
        const users = get().users;
        return [...users].sort((a, b) => {
          const aTotal = Object.values(a.points).reduce((sum, val) => sum + val, 0);
          const bTotal = Object.values(b.points).reduce((sum, val) => sum + val, 0);
          return bTotal - aTotal;
        });
      },
    }),
    {
      name: 'regen-trail-storage',
    }
  )
);