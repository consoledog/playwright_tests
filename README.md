1. Clone the repository
2. Install playwright and all playwright browsers
3. Install node dependecies
    ```bash
    npm install
    ```
3. Run the project by using
   ```bash
   npm test
   ```

Alternative (Run docker image, so docker is prerequisite):
1. Clone the repository
2. From root directory in cmd type the following line to build docker image:
   ```bash
   docker build -t playwright-project .
   ```
3. From root directory in cmd type the following line to run docker image:
   ```bash
   docker run --rm playwright-project
   ```
   Note:  -- rm flag ensures the container is removed after it exits