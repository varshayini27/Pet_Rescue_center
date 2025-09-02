import { supabase } from "../supabaseClient";

export const uploadImage = async (file: File): Promise<string | null> => {
  if (!file) return null;

  try {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("rescue-center-project-images")
      .upload(fileName, file);

    if (error) {
      console.error("Supabase upload error:", error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("rescue-center-project-images")
      .getPublicUrl(fileName);

    return publicUrlData?.publicUrl ?? null;
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
};
