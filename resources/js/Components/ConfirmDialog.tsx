import Modal from '@/Components/Modal';
import { useTranslation } from 'react-i18next';

interface Props {
    show: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({ show, message, onConfirm, onCancel }: Props) {
    const { t } = useTranslation();

    return (
        <Modal show={show} maxWidth="sm" closeable onClose={onCancel}>
            <div className="p-6 dark:bg-gray-800">
                <p className="text-sm text-gray-700 dark:text-gray-200">{message}</p>
                <div className="mt-5 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        {t('common.cancel')}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                        {t('common.delete')}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
