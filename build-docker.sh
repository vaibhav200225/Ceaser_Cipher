#!/bin/bash
docker rm -f web_oopartdb
docker build --tag=web_oopartdb .
docker run -p 1337:80 -it --name=web_oopartdb web_oopartdb