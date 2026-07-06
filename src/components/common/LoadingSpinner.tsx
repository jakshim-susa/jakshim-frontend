export const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-bg-primary gap-4">
            <div className="w-12 h-12 border-4 border-secondary border-t-primary rounded-full animate-spin" />
            <p className="text-text-muted text-sm">불러오는 중...</p>
        </div>
    );
};
