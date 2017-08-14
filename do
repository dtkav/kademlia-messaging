#!/bin/bash

PEER_PORT=${PORT:=41234}

function build() {
    docker build -t kademlia-server .
}

function run() {
    docker run -it --rm -p $1:41234/udp --name kademlia-node-$1 kademlia-server 
}

function ping() {
    docker exec kademlia-node-$1 echo "PING" > /dev/udp/0.0.0.0/$1
}

function client() {
    docker exec kademlia-node-$1 node test/client.js
}

function shell() {
    docker exec -it kademlia-node-$1 /bin/bash
}

opt="$1";
case "$opt" in
    "build") build;;
    "run") run $PEER_PORT;;
    "ping") ping $PEER_PORT;;
    "client") client $PEER_PORT;;
    "shell") shell $PEER_PORT;;
    *) build; run $PEER_PORT;;
esac
