This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First install all required packages with npm:
```bash
npm install
```

then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


-- Install --
This Project requires Node.js (latest LTS version). You can download the Node.js installer here: [NodeJS Installer](https://nodejs.org/en/download/). Download and open the installer and follow the instructions until completion.

![Screenshot_2023-01-10_at_14.00.54](uploads/4f05499821eff5b878b2c5e154609a2c/Screenshot_2023-01-10_at_14.00.54.png)

The next step is to setup the MySql database. Download the newest version of the [MySql Workbench](https://dev.mysql.com/downloads/workbench/) and install it. Now create a new connection. Set the password of the connection to password123. You can choose a diffrent password but remember to change it in your .env later on. If you need help follow this short [Tutorial](https://docs.bitnami.com/aws/apps/civicrm/configuration/configure-workbench/). Open the connection and select server -> data import.

![grafik](uploads/fa9e1c43da812dd85af6bede72e773f7/grafik.png)

Download this sql file and place it in a convinient location:[Dump20230914.sql](uploads/0858e87300d0f18a578f69f219c6c356/Dump20230914.sql).
In the MySql Workbench select `Import from Self-Contrained File` and choose the location of the database.sql file that you downloaded. Then select `Start import`.

![grafik](uploads/2a663770607581c91395a42ce4702f85/grafik.png)

Once Node.js is installed on your machine and your database is set up correctly you can open the project folder (Aprovement_Advisor) in the terminal. On windows open the project folder in the explorer and press alt+d to focus the adress bar. then type in `cmd` and press `enter` in order to open the folder in the terminal.

![WindowsCMD_1](uploads/a9b84d1f7bcdee3352fce9f2e2eac31f/WindowsCMD_1.PNG) ![WindowsCMD_2](uploads/7eb3da7c8dfb18967570a7b9058a4324/WindowsCMD_2.PNG)

On Mac rightclick the folder in the finder and select `new terminal at folder`.

![Screenshot_2023-01-10_at_14.13.02](uploads/59908167df01de9cb5c3035262284706/Screenshot_2023-01-10_at_14.13.02.png)

A terminal should open at the project location.

![Screenshot_2023-01-10_at_14.28.43](uploads/13350f8028b4ee78758be10a9810cc73/Screenshot_2023-01-10_at_14.28.43.png)

Now we need to create a .env file which contains the credentials for our database. On Windows in the explorer in the project folder rightcklick and select `new` -> `text file` and name it `.env`. Open the file you just created.

![grafik](uploads/aaa678a92d8162a16126266eb7ba4bc7/grafik.png)

On Mac or Linux type `nano .env` into the console to create the env file.

Paste the following into your textfile

```
DATABASE_URL="mysql://root:password123@127.0.0.1:3306/improvement_advisor"
```

On Windows press `CTRL + S` to save the file.
On Mac/Linux `CTRL + X`and then type `Y` and press `enter` to save the file.

![grafik](uploads/c1d90b742c88ece2a7336690c1f5df11/grafik.png)

Now in your terminal which is opend at the project location type `npm install` into the terminal and press `enter`.

![Screenshot_2023-01-10_at_14.29.01](uploads/dec22540156dbb587e391f258b583d27/Screenshot_2023-01-10_at_14.29.01.png)

If a prompt askes you for permission type in `y` and press `enter`. After the installation is completed type `npm run dev` into the terminal and press `enter` in order to start the webserver. Your terminal should display something like this:

```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
event - compiled client and server successfully in 523 ms (178 modules)
```

You can now open [http://localhost:3000](http://localhost:3000) in your browser and use the website. If you want to close the webserver go back into the terminal in which you started the server and press `ctrl + c`.

If you want to start the server again open a terminal at the project location and type `npm run dev`.
