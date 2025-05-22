import ProfileSettings from '@/features/profile/profile-setting-view';
import { createClient } from '@/utils/supabase/server';

const ProfilePage = async () => {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  console.log(data);

  const handleUpdateUser = async (user: any) => {
    supabase.auth.updateUser({
      data: {
        user_metadata: {
          fullname: 'John Doe',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        },
      },
    })
  }

  return (
    <div className="container max-w-xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Content Area */}
      <div className="md:col-span-2 space-y-6">
        <ProfileSettings user={data.user} />
      </div>
    </div>
  )
}

export default ProfilePage