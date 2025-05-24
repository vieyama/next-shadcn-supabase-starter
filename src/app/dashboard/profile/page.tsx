import AppBreadcrumb from '@/components/layouts/app-breadcrumb';
import ProfileSettings from '@/features/profile/profile-setting-view';
import { createClient } from '@/utils/supabase/server';

const ProfilePage = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const breadcrumb = [
    { label: 'Home', url: '/dashboard' },
    { label: 'Profile' }
  ];

  return (
    <>
      <AppBreadcrumb items={breadcrumb} />

      <div className='container mx-auto max-w-xl space-y-8 px-4 py-8 sm:px-6'>
        {/* Content Area */}
        <div className='space-y-6 md:col-span-2'>
          <ProfileSettings user={data.user} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
