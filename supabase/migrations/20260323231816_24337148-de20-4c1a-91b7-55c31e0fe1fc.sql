
-- Update handle_new_user to also create walker_profile if user_type is walker or both
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.profiles (id, email, first_name, last_name, user_type)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    coalesce((new.raw_user_meta_data ->> 'user_type')::user_type, 'owner')
  );
  
  -- Create default user role
  insert into public.user_roles (user_id, role)
  values (new.id, 'user');
  
  -- If walker, create walker_profile
  if (new.raw_user_meta_data ->> 'user_type') in ('walker', 'both') then
    insert into public.walker_profiles (user_id)
    values (new.id);
  end if;
  
  return new;
end;
$function$;
