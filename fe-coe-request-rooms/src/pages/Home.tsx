import ImgWelcome from '../assets/image-welcome-page.png';
import Button from '../components/Button';

const HomePage = () => {
    return (
        <div className="w-screen h-screen bg-[var(--background-color)] flex flex-col items-center">
            <h1 className="text-6xl font-bold text-[var(--text-color)] my-14">
                <span className="text-[var(--primary-color)]">CoE</span> Rooms
            </h1>

            <Button>
                <a href="#">Sign in</a>
            </Button>

            <p className="mt-8 text-[var(--text-color)]">
                You don’t have an account?{' '}
                <span className="text-[var(--primary-color)] cursor-pointer">Sign up</span>
            </p>

            <img className="mt-14" src={ImgWelcome} alt="Welcome Illustration" />

            <footer className="mt-14 text-center text-[#140B0C] opacity-40">
                <p>Developed by</p>
                <p>BOSS OHM LEE EARTH ICE</p>
            </footer>
        </div>
    );
};

export default HomePage;
