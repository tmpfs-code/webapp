FROM node:15-alpine
RUN apk update && \
    apk --no-cache add git gcc g++ make ca-certificates curl

# copy the webapp to /workspace
RUN mkdir /workspace
COPY . /workspace/
WORKDIR /workspace

# allow building at a specific point in time using the given git commit hash or tag
# e.g. docker build -t webapp --build-arg git_commit=v0.0.1 .
ARG git_commit=HEAD
ENV git_commit $git_commit

# remove non-git files, checkout to the given commit hash (by default is HEAD)
# and remove the .git folder
RUN ls package.json && \
    git clean -df && \
    git reset --hard && \
    git checkout $git_commit && \
    git log -1 && \
    rm -rf .git

# build it
RUN npm install && \
    sha256sum -c ./ext-libs-checksums.txt && \
    GENERATE_SOURCEMAP=false REACT_APP_API_SRV_ADDR="/" REACT_APP_CHAIN_ID=1 REACT_APP_GIT_COMMIT_HASH="$git_commit" npm run build && \
    npm run buildDelServiceWorker && \
    npm run buildGzip && \
    npm run buildChecksums

# keep only the result of the build process
RUN cp -r /workspace/build / && \
    rm -rf /workspace
WORKDIR /build
