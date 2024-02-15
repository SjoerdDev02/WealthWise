# WealthWise

This project provides a tool to gain insight into your financial situation by filling in monthly data.

## Technologies
- Laravel
- NextJS
- TypeScript
- SCSS
- Axios
- React Context
- Framer Motion
- ChartJS & React-ChartJS-2

## Installation Instructions
Follow the steps below to install the project locally:

1. Download the project to your computer.
2. Navigate to the directory named `client`.
3. Run `npm install` in the terminal.
4. In a new terminal, navigate to the directory named `server`.
5. Run `composer install` in the terminal.
6. Run `cp .env.example .env` in the terminal.
7. Fill in your own username and password for `USERNAME` and `PASSWORD` on lines 15 and 16 of .env.
8. Run `php artisan key:generate` in the terminal.
9. Start `XAMPP`, `WAMP`, or `MAMP`.
10. Set the `MySQL` port to `3306` and the root to the folder named `public` in this project.
11. Run `php artisan migrate:fresh --seed` in the terminal.
12. Run `php artisan serve` in the terminal.
13. Go back to the terminal where you ran `npm install` earlier.
14. Run `npm run dev`.
15. Navigate to the URL below.

Check the terminal where you executed `npm run dev` for the port. In this example, I assume port 3000.
URL: [http://localhost:3000](http://localhost:3000)

Make sure to follow the above steps carefully to use the project locally. Feel free to customize the project according to your preferences. For questions or feedback, you can contact me via [sjoerd.kessels2002@gmail.com](mailto:sjoerd.kessels2002@gmail.com).