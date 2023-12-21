// sessionUtils.js or sessionUtils.ts

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getItem } from '@/store/reducer.reducer'; 
import { useSession } from 'next-auth/react';
// Replace with your action

export function useGetItemOnSessionChange() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession({
    required: true,
  });

  useEffect(() => {
    if (status === 'authenticated' && session) {
      dispatch(getItem(session));
    }
  }, [dispatch, session, status]);
}
