import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useAvatarUpload = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  const uploadAvatar = async (file: File) => {
    if (!user) throw new Error("Not authenticated");
    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true });
    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(path);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", user.id);
    if (updateError) throw updateError;

    qc.invalidateQueries({ queryKey: ["profile"] });
    toast.success("Photo de profil mise à jour !");
    return publicUrl;
  };

  return { uploadAvatar };
};

export const useDogPhotoUpload = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  const uploadDogPhoto = async (dogId: string, file: File) => {
    if (!user) throw new Error("Not authenticated");
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${dogId}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("dog-photos")
      .upload(path, file, { upsert: true });
    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("dog-photos")
      .getPublicUrl(path);

    const { error: updateError } = await supabase
      .from("dogs")
      .update({ photo_url: publicUrl })
      .eq("id", dogId);
    if (updateError) throw updateError;

    qc.invalidateQueries({ queryKey: ["dogs"] });
    toast.success("Photo du chien mise à jour !");
    return publicUrl;
  };

  return { uploadDogPhoto };
};
