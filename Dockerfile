FROM node:12-alpine
RUN apk update && \
    apk --no-cache add git gcc g++ make ca-certificates curl

# copy the webapp to /workspace
RUN mkdir /workspace
COPY . /workspace/
WORKDIR /workspace

# remove non-git files and the .git folder
RUN ls package.json && \
    ls .git && \
    git clean -df && \
    rm -rf .git

# build it
RUN npm install
RUN ./ext-libs-fetch.sh
RUN GENERATE_SOURCEMAP=false REACT_APP_API_SRV_ADDR="/" npm run build && \
    npm run buildDelServiceWorker && \
    npm run buildGzip && \
    npm run buildChecksums

# keep only the result of the build process
RUN cp -r /workspace/build / && \
    rm -rf /workspace
WORKDIR /build
