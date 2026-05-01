import { Link } from '@inertiajs/react';

export default function AppFooter() {
    return (
        <footer className="mt-auto border-t border-gray-200/80 py-6 dark:border-gray-700/80">
            <div className="container mx-auto flex items-center justify-center gap-4 px-4 text-xs text-gray-400 dark:text-gray-500">
                <Link href={route('terms')} className="hover:text-gray-600 hover:underline dark:hover:text-gray-300">
                    Terms of Service
                </Link>
                <span>·</span>
                <Link href={route('privacy')} className="hover:text-gray-600 hover:underline dark:hover:text-gray-300">
                    Privacy Policy
                </Link>
            </div>
        </footer>
    );
}
