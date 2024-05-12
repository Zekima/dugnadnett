

'use client'

const ChangePassword = () => {
    return (
        <div className="gap-4 flex flex-col">
            <h2 className="font-medium">Endre Passord</h2>
            <div className="flex flex-col gap-3">
                <div className="gap-1.5 flex flex-col">
                    <p className="text-sm">Gammelt Passord</p>
                    <input
                        type="password"
                        className="border h-10 rounded-md p-2 border-gray-400 w-[300px]"
                    />
                </div>
                <div className="gap-1.5 flex flex-col">
                    <p className="text-sm">Nytt Passord</p>
                    <input
                        type="password"
                        className="border h-10 rounded-md p-2 border-gray-400 w-[300px]"
                    />
                </div>
            </div>
            <button
                className="px-4 h-10 py-2 text-white h-full bg-green-700  w-[100px] rounded-md hover:bg-green-800 border-green-700"
            >
                Lagre
            </button>

        </div>
    )
}

export default ChangePassword;