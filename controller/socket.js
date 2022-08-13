import { addRoute } from "./trip.js"

const socketFunc = (io) => {
    io.on("connection", (socket) => {
        socket.on('join-room', (tripId) => {
            socket.join(tripId)
        })
        socket.on('disconnect', () => {
            console.log("Got disconnected")
        })

        socket.on('start', (tripId) => {
     
            socket.to(tripId).emit('give-location')
      
        })
        let buffer = []

        socket.on('first-location',(obj) => {
            socket.to(obj.tripId).emit("recieve-first-location",obj.location)
        })


        socket.on('sendLocation', (obj) => {
        
            if (buffer.length >= 5) {
                socket.to(obj.tripId).emit("recieve-location", obj.location)
                
                addRoute(buffer, obj.tripId)
                buffer = []
                buffer.push(obj.location)
                // Flush the buffer in the mongoose database
            }
            else {
                if(buffer.length === 0){
                    socket.to(obj.tripId).emit("recieve-location", obj.location)

                    buffer.push(obj.location)
                }
                else{
                    if(buffer[buffer.length-1][0] !== obj.location[0] || buffer[buffer.length-1][1] !== obj.location[1]){
                        socket.to(obj.tripId).emit("recieve-location", obj.location)
                        buffer.push(obj.location)
                    }
                }
                

                // add the element to the buffer
            }

        })

    })

}
export default socketFunc