# udp-serializer

Messaging component for a group kademlia project.

Serialize / Deserialize javascript objects to appropriate UDP packets
- UDP glue code
- Callback function on receipt of UDP message which is called with deserialized object
- Random ID generation

# requirements
you need docker

# howto
to build the docker container
```
./do build  # builds the docker container
```

to run the server:
```
./do run
```

you can run /test/client.js to exercize some basic messaging.
to run a dummy client:
```
./do client
```

you can connect to a container with:
```
./do shell
```

you can specify the upd port as an environment variable:
```
PORT=41235 ./do
```

# good luck!
