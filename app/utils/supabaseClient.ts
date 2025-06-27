import { createClient } from '@supabase/supabase-js';
import { Database, Tables } from './database.types';
import { observable } from '@legendapp/state';
import { syncedSupabase } from '@legendapp/state/sync-plugins/supabase';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { configureSynced } from '@legendapp/state/sync';
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,     // Use AsyncStorage for auth persistence
      autoRefreshToken: true,    // Automatically refresh tokens
      persistSession: true,      // Persist session in AsyncStorage
      detectSessionInUrl: false, // Disable URL detection for session
    }
  }
);

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

// Provide a function to generate ids locally
const generateId = () => uuidv4();

// Create a configured sync function
const customSynced = configureSynced(syncedSupabase, {
  // Use React Native Async Storage
  persist: {
    plugin: observablePersistAsyncStorage({
      AsyncStorage,
    }),
  },
  generateId,
  supabase,
  changesSince: 'last-sync',
  fieldCreatedAt: 'created_at',
  fieldUpdatedAt: 'updated_at',
  // Optionally enable soft deletes
  // fieldDeleted: 'deleted',
});

/* authentication functions */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return error;
}

export async function signUpWithEmail(email: string, password: string) {
  const { data: { session }, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  return { session, error };
}

export async function signInWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email:  email,
    password: password,
  });
  return error;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  return error;
}

/* todos - from starter code (for reference) */
export const todos$ = observable(
  customSynced({
    supabase,
    collection: 'todos',
    select: (from) =>
      from.select('id,counter,text,done,created_at,updated_at,deleted'),
    actions: ['read', 'create', 'update', 'delete'],
    realtime: true,
    // Persist data and pending changes locally
    persist: {
      name: 'todos',
      retrySync: true, // Persist pending changes and retry
    },
    retry: {
      infinite: true, // Retry changes with exponential backoff
    },
  })
);

export function addTodo(text: string) {
  const id = generateId();
  // Add keyed by id to the todos$ observable to trigger a create in Supabase
  todos$[id].assign({
    id,
    text,
  });
}

export function toggleDone(id: string) {
  todos$[id].done.set((prev) => !prev);
}

/* muscles functions */

export const muscles$ = observable(
  customSynced({
    supabase,
    collection: 'muscles',
    select: (from) =>
      from.select('id,name,muscle_group_id,is_active,created_at,updated_at'),
    actions: ['read', 'create', 'update', 'delete'],
    realtime: true,
    // Persist data and pending changes locally
    persist: {
      name: 'muscles',
      retrySync: true, // Persist pending changes and retry
    },
    retry: {
      infinite: true, // Retry changes with exponential backoff
    },
  })
);

export function addMuscle(text: string) {
  const id = generateId();
  // Add keyed by id to the muscles$ observable to trigger a create in Supabase
  muscles$[id].assign({
    id,
    text,
  });
}

export function toggleActive(id: string) {
  muscles$[id].active.set((prev) => !prev);
}

/* client functions */

export const clients$ = observable(
  customSynced({
    supabase,
    collection: 'clients',
    select: (from) =>
      from.select('id,email,name,age,height,weight,gender,user_id,is_active,created_at,updated_at'),
    actions: ['read', 'create', 'update', 'delete'],
    realtime: true,
    // Persist data and pending changes locally
    persist: {
      name: 'clients',
      retrySync: true, // Persist pending changes and retry
    },
    retry: {
      infinite: true, // Retry changes with exponential backoff
    },
  })
);

export function addClient(email: string, name: string, age: number, height: number, weight: number, gender: string, user_id: string) {
  const id = generateId();
  // Add keyed by id to the clients$ observable to trigger a create in Supabase
  clients$[id].assign({
    id: id,
    email: email,
    name: name,
    age: age,
    height: height,
    weight: weight,
    gender: gender,
    user_id: user_id,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
}

export async function getClientByAuthUserId(user_id: string) {
  const { data: client, error, status } = await supabase
    .from('clients')
    .select(`*`)
    .eq('user_id', user_id)
    .single(); // Use .single() if you expect only one result

    return { client, error, status }; 
}

export async function updateClient(updates: Partial<Tables<'clients'>>) {
  const { error } = await supabase
    .from('clients')
    .upsert(updates) // clientId passed in
    .select()
  return error;
}

export async function updateClientById(id: string, updates: Partial<Tables<'clients'>>) {
  const { error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id);
  return error;
}

/**
 * Supabase function to check if a client has been onboarded
 * 
 * @param auth_user_id uuid
 * @returns true if the client has been onboarded
 */
export async function clientIsOnboarded(auth_user_id: string){
  const { data, error } = await supabase
    .rpc('clientIsOnboarded', { auth_user_id: auth_user_id });
  
  return { data, error };
}
