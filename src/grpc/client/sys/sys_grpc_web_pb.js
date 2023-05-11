/**
 * @fileoverview gRPC-Web generated client stub for sys
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.sys = require('./sys_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.sys.sysClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.sys.sysPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sys.LoginReg,
 *   !proto.sys.sysReply>}
 */
const methodDescriptor_sys_Login = new grpc.web.MethodDescriptor(
  '/sys.sys/Login',
  grpc.web.MethodType.UNARY,
  proto.sys.LoginReg,
  proto.sys.sysReply,
  /** @param {!proto.sys.LoginReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sys.sysReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sys.LoginReg,
 *   !proto.sys.sysReply>}
 */
const methodInfo_sys_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sys.sysReply,
  /** @param {!proto.sys.LoginReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sys.sysReply.deserializeBinary
);


/**
 * @param {!proto.sys.LoginReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sys.sysReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sys.sysReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sys.sysClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sys.sys/Login',
      request,
      metadata || {},
      methodDescriptor_sys_Login,
      callback);
};


/**
 * @param {!proto.sys.LoginReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sys.sysReply>}
 *     A native promise that resolves to the response
 */
proto.sys.sysPromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sys.sys/Login',
      request,
      metadata || {},
      methodDescriptor_sys_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sys.LoginReg,
 *   !proto.sys.sysReply>}
 */
const methodDescriptor_sys_LoginGAuth = new grpc.web.MethodDescriptor(
  '/sys.sys/LoginGAuth',
  grpc.web.MethodType.UNARY,
  proto.sys.LoginReg,
  proto.sys.sysReply,
  /** @param {!proto.sys.LoginReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sys.sysReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sys.LoginReg,
 *   !proto.sys.sysReply>}
 */
const methodInfo_sys_LoginGAuth = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sys.sysReply,
  /** @param {!proto.sys.LoginReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sys.sysReply.deserializeBinary
);


/**
 * @param {!proto.sys.LoginReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sys.sysReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sys.sysReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sys.sysClient.prototype.loginGAuth =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sys.sys/LoginGAuth',
      request,
      metadata || {},
      methodDescriptor_sys_LoginGAuth,
      callback);
};


/**
 * @param {!proto.sys.LoginReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sys.sysReply>}
 *     A native promise that resolves to the response
 */
proto.sys.sysPromiseClient.prototype.loginGAuth =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sys.sys/LoginGAuth',
      request,
      metadata || {},
      methodDescriptor_sys_LoginGAuth);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sys.LoginReg,
 *   !proto.sys.sysReply>}
 */
const methodDescriptor_sys_RefreshToken = new grpc.web.MethodDescriptor(
  '/sys.sys/RefreshToken',
  grpc.web.MethodType.UNARY,
  proto.sys.LoginReg,
  proto.sys.sysReply,
  /** @param {!proto.sys.LoginReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sys.sysReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sys.LoginReg,
 *   !proto.sys.sysReply>}
 */
const methodInfo_sys_RefreshToken = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sys.sysReply,
  /** @param {!proto.sys.LoginReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sys.sysReply.deserializeBinary
);


/**
 * @param {!proto.sys.LoginReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sys.sysReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sys.sysReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sys.sysClient.prototype.refreshToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sys.sys/RefreshToken',
      request,
      metadata || {},
      methodDescriptor_sys_RefreshToken,
      callback);
};


/**
 * @param {!proto.sys.LoginReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sys.sysReply>}
 *     A native promise that resolves to the response
 */
proto.sys.sysPromiseClient.prototype.refreshToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sys.sys/RefreshToken',
      request,
      metadata || {},
      methodDescriptor_sys_RefreshToken);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sys.sysDateReg,
 *   !proto.sys.sysReply>}
 */
const methodDescriptor_sys_sysDate = new grpc.web.MethodDescriptor(
  '/sys.sys/sysDate',
  grpc.web.MethodType.UNARY,
  proto.sys.sysDateReg,
  proto.sys.sysReply,
  /** @param {!proto.sys.sysDateReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sys.sysReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sys.sysDateReg,
 *   !proto.sys.sysReply>}
 */
const methodInfo_sys_sysDate = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sys.sysReply,
  /** @param {!proto.sys.sysDateReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sys.sysReply.deserializeBinary
);


/**
 * @param {!proto.sys.sysDateReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sys.sysReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sys.sysReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sys.sysClient.prototype.sysDate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sys.sys/sysDate',
      request,
      metadata || {},
      methodDescriptor_sys_sysDate,
      callback);
};


/**
 * @param {!proto.sys.sysDateReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sys.sysReply>}
 *     A native promise that resolves to the response
 */
proto.sys.sysPromiseClient.prototype.sysDate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sys.sys/sysDate',
      request,
      metadata || {},
      methodDescriptor_sys_sysDate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sys.VailReg,
 *   !proto.sys.sysReply>}
 */
const methodDescriptor_sys_GetVailIMG = new grpc.web.MethodDescriptor(
  '/sys.sys/GetVailIMG',
  grpc.web.MethodType.UNARY,
  proto.sys.VailReg,
  proto.sys.sysReply,
  /** @param {!proto.sys.VailReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sys.sysReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sys.VailReg,
 *   !proto.sys.sysReply>}
 */
const methodInfo_sys_GetVailIMG = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sys.sysReply,
  /** @param {!proto.sys.VailReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sys.sysReply.deserializeBinary
);


/**
 * @param {!proto.sys.VailReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sys.sysReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sys.sysReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sys.sysClient.prototype.getVailIMG =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sys.sys/GetVailIMG',
      request,
      metadata || {},
      methodDescriptor_sys_GetVailIMG,
      callback);
};


/**
 * @param {!proto.sys.VailReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sys.sysReply>}
 *     A native promise that resolves to the response
 */
proto.sys.sysPromiseClient.prototype.getVailIMG =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sys.sys/GetVailIMG',
      request,
      metadata || {},
      methodDescriptor_sys_GetVailIMG);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sys.CBNAMEReg,
 *   !proto.sys.sysReply>}
 */
const methodDescriptor_sys_GETCBNAME = new grpc.web.MethodDescriptor(
  '/sys.sys/GETCBNAME',
  grpc.web.MethodType.UNARY,
  proto.sys.CBNAMEReg,
  proto.sys.sysReply,
  /** @param {!proto.sys.CBNAMEReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sys.sysReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sys.CBNAMEReg,
 *   !proto.sys.sysReply>}
 */
const methodInfo_sys_GETCBNAME = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sys.sysReply,
  /** @param {!proto.sys.CBNAMEReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sys.sysReply.deserializeBinary
);


/**
 * @param {!proto.sys.CBNAMEReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sys.sysReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sys.sysReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sys.sysClient.prototype.gETCBNAME =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sys.sys/GETCBNAME',
      request,
      metadata || {},
      methodDescriptor_sys_GETCBNAME,
      callback);
};


/**
 * @param {!proto.sys.CBNAMEReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sys.sysReply>}
 *     A native promise that resolves to the response
 */
proto.sys.sysPromiseClient.prototype.gETCBNAME =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sys.sys/GETCBNAME',
      request,
      metadata || {},
      methodDescriptor_sys_GETCBNAME);
};


module.exports = proto.sys;

