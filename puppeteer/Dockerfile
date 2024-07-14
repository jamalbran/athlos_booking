# Use the official AWS Lambda Node.js 14 image
FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:18

# Set an environment variable to skip Chromium installation
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Include global arg in this stage of the build
ARG FUNCTION_DIR="/var/task"

# Copy package.json and package-lock.json to the working directory
COPY package*.json ${FUNCTION_DIR}/


# Set the working directory
WORKDIR ${FUNCTION_DIR}

# Install dependencies including puppeteer-core
RUN npm install --only=prod

RUN npm install puppeteer@18.0.5

RUN ln -s /root/.cache/puppeteer/chrome/linux-126.0.6478.126/chrome-linux64/chrome /tmp/chromium
# RUN ln -s /root/.cache/puppeteer/chrome/linux-126.0.6478.126/chrome-linux64/chrome /tmp/chromium

# Copy the rest of the application code to the working directory
COPY ./dist ${FUNCTION_DIR}

# Install additional dependencies required by Puppeteer (if any)
RUN yum -y install \
  mesa-libOSMesa-devel \
  alsa-lib \
  atk \
  cups-libs \
  gtk3 \
  libXcomposite \
  libXcursor \
  libXdamage \
  libXi \
  libXtst \
  pango \
  xorg-x11-fonts-Type1 \
  xorg-x11-fonts-misc

COPY entrypoint.sh ${FUNCTION_DIR}/entrypoint.sh

# ENTRYPOINT "/bin/bash"
# Command to run the lambda function
ENTRYPOINT ["/var/task/entrypoint.sh"]
#CMD ["node" "index.js"]

