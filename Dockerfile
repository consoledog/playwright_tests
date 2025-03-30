# Use the official Playwright image
FROM mcr.microsoft.com/playwright:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package.json package-lock.json ./

# Install dependencies in a reproducible way
RUN npm ci

# Copy the rest of the project files
COPY . .

# (Optional) Ensure browsers are installed with all necessary dependencies
RUN npx playwright install --with-deps

# Default command to run Playwright tests
CMD ["npx", "playwright", "test"]