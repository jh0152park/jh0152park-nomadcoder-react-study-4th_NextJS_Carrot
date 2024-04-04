interface IFromButton {
    name: string;
    loading: boolean;
}

export default function FormButton({ name, loading }: IFromButton) {
    return (
        <button
            className="h-10 font-medium primary-button disabled:bg-green-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
        >
            {loading ? "Loading" : name}
        </button>
    );
}
