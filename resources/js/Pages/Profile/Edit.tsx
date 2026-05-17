import AppFooter from '@/Components/AppFooter';
import AppHeader from '@/Components/AppHeader';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
    isPro,
    hasPassword,
}: PageProps<{ mustVerifyEmail: boolean; status?: string; isPro: boolean; hasPassword: boolean }>) {
    return (
        <>
            <Head title="設定" />
            <AppHeader userName={auth.user.name} isPro={isPro} />

            <main className="min-h-screen bg-gray-50 py-10 dark:bg-gray-950">
                <div className="mx-auto max-w-2xl space-y-6 px-4">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        設定
                    </h1>

                    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {hasPassword && (
                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    )}

                    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                        <DeleteUserForm className="max-w-xl" hasPassword={hasPassword} />
                    </div>
                </div>
            </main>

            <AppFooter />
        </>
    );
}
