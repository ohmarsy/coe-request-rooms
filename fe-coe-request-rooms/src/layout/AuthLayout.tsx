import ImageAuth from '../assets/image-auth.png'
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <div className="w-1/3 bg-[var(--primary-color)] text-white flex flex-col items-center  p-10">
                <div className="mt-12 text-m">
                    <p> CoE Rooms</p>
                    <p className="text-3xl leading-relaxed mt-4">

                        Your workspace awaits <br />
                        Where Ideas bloom <br />
                        and comfort meets <br />
                        productivity.
                    </p>
                </div>
            
            <img src={ImageAuth}></img>

            </div>
            <div className="w-2/3 flex items-center justify-center">{children}</div>
        </div>
    );
}
