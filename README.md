# Project Name

## Overview
This project is a [Next.js](https://nextjs.org/) application that provides a comprehensive web solution. It includes various features such as a dynamic header, responsive design, and integration with a MySQL database.

## Tech Stack
- **Frontend:** React, Next.js, Tailwind CSS, Bootstrap CSS
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Other:** Prisma, Reactstrap

## Setup Instructions
### Prerequisites
- Node.js (latest LTS version)
- MySQL

### Installation
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install all required packages:
    ```bash
    npm install
    ```

3. Set up the MySQL database:
    - Download and install [MySQL Workbench](https://dev.mysql.com/downloads/workbench/).
    - Create a new connection with the password `password123` (or your preferred password).
    - Update the [.env](http://_vscodecontentref_/0) file with your database credentials.

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Features
- **Unique Desing:** Design was tailor made to fit very detailed customer requests.
- **Responsive Design:** The layout adjusts seamlessly across different screen sizes. Mobile Design is not finished for all pages yet, will be finished in the near future
- **Database Integration:** Uses MySQL for data storage and Prisma for ORM.
- **Purpose:** Allows users to create a circular design based on their needs and product and export it as a pdf file

## Live Link
Check out the live version of the project [here](https://www.circularity-navigator.com).