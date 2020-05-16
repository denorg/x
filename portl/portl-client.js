const cbs = [];
const freeIDs = [];
window.id = freeIDs;

let ready = false;

let socket;

const sendQueue = [];

const sendWhenReady = (obj) => {
  if (ready) {
    socket.send(JSON.stringify(obj));
  } else {
    sendQueue.push(JSON.stringify(obj));
  }
};

const initSocket = () => {
  ready = false;
  try {
    socket = new WebSocket("ws://localhost:8080");
  } catch (e) {
    console.error(e);
  }

  socket.addEventListener("close", initSocket);

  socket.addEventListener("open", () => {
    while (sendQueue.length) {
      socket.send(sendQueue.shift());
    }
    ready = true;
  });

  socket.addEventListener("message", function({ data }) {
    const { fn, id, ret, once, done, error } = JSON.parse(data);

    if (error) {
      console.error(fn, error);
    } else if (done) {
      unsubscribeID(id);
    } else {
      cbs[id](ret);
      if (once) {
        unsubscribeID(id);
      }
    }
  });

  //   socket.addEventListener("error", function(error) {
  //     console.log("WebSocket Error " + error);
  //   });
};

initSocket();

const portl = new Proxy(
  {},
  {
    get: (target, key, proxy) => (...args) => ({
      _setID: function(cb) {
        let id = freeIDs.shift();
        if (id !== undefined) {
          cbs[id] = cb;
        } else {
          id = cbs.push(cb) - 1;
        }
        this.id = id;
      },
      then: function(cb) {
        this._setID(cb);
        sendWhenReady({ fn: key, once: true, args, id: this.id });
      },

      subscribe: function(cb) {
        this._setID(cb);
        sendWhenReady({ fn: key, once: false, args, id: this.id });
      },
      unsubscribe: function() {
        console.log(this);
        sendWhenReady({ fn: key, done: true, id: this.id });
      }
    })
  }
);

const unsubscribeID = (id) => {
  freeIDs.push(id);
  cbs[id] = () => {};
};

export default portl;
