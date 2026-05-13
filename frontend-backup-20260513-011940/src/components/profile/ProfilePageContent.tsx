import { StandardCard } from "../layout/shell/StandardCard";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { useProfile } from "@/hooks/useProfile";

export function ProfilePageContent() {
  const {
    profile,
    formValues,
    isLoading,
    isSaving,
    saved,
    error,
    canSave,
    updateField,
    handleSave,
  } = useProfile();

  return (
    <StandardCard
      title="Profile"
      description="View and update your account information"
    >
      <ProfileForm
        profile={profile}
        formValues={formValues}
        isLoading={isLoading}
        isSaving={isSaving}
        error={error}
        saved={saved}
        canSave={canSave}
        updateField={updateField}
        handleSave={handleSave}
      />
    </StandardCard>
  );
}