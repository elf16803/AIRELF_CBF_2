/**
 * @fileoverview gRPC-Web generated client stub for sdata
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.sdata = require('./sdata_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.sdata.sdataClient =
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
proto.sdata.sdataPromiseClient =
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
 *   !proto.sdata.CACReg,
 *   !proto.sdata.sdataReply>}
 */
const methodDescriptor_sdata_GetCAC = new grpc.web.MethodDescriptor(
  '/sdata.sdata/GetCAC',
  grpc.web.MethodType.UNARY,
  proto.sdata.CACReg,
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.CACReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sdata.CACReg,
 *   !proto.sdata.sdataReply>}
 */
const methodInfo_sdata_GetCAC = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.CACReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @param {!proto.sdata.CACReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sdata.sdataReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sdata.sdataReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sdata.sdataClient.prototype.getCAC =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sdata.sdata/GetCAC',
      request,
      metadata || {},
      methodDescriptor_sdata_GetCAC,
      callback);
};


/**
 * @param {!proto.sdata.CACReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sdata.sdataReply>}
 *     A native promise that resolves to the response
 */
proto.sdata.sdataPromiseClient.prototype.getCAC =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sdata.sdata/GetCAC',
      request,
      metadata || {},
      methodDescriptor_sdata_GetCAC);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sdata.XGCReg,
 *   !proto.sdata.sdataReply>}
 */
const methodDescriptor_sdata_GETXGC = new grpc.web.MethodDescriptor(
  '/sdata.sdata/GETXGC',
  grpc.web.MethodType.UNARY,
  proto.sdata.XGCReg,
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.XGCReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sdata.XGCReg,
 *   !proto.sdata.sdataReply>}
 */
const methodInfo_sdata_GETXGC = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.XGCReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @param {!proto.sdata.XGCReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sdata.sdataReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sdata.sdataReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sdata.sdataClient.prototype.gETXGC =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sdata.sdata/GETXGC',
      request,
      metadata || {},
      methodDescriptor_sdata_GETXGC,
      callback);
};


/**
 * @param {!proto.sdata.XGCReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sdata.sdataReply>}
 *     A native promise that resolves to the response
 */
proto.sdata.sdataPromiseClient.prototype.gETXGC =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sdata.sdata/GETXGC',
      request,
      metadata || {},
      methodDescriptor_sdata_GETXGC);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sdata.XGCDTReg,
 *   !proto.sdata.sdataReply>}
 */
const methodDescriptor_sdata_GETXGCDT = new grpc.web.MethodDescriptor(
  '/sdata.sdata/GETXGCDT',
  grpc.web.MethodType.UNARY,
  proto.sdata.XGCDTReg,
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.XGCDTReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sdata.XGCDTReg,
 *   !proto.sdata.sdataReply>}
 */
const methodInfo_sdata_GETXGCDT = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.XGCDTReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @param {!proto.sdata.XGCDTReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sdata.sdataReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sdata.sdataReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sdata.sdataClient.prototype.gETXGCDT =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sdata.sdata/GETXGCDT',
      request,
      metadata || {},
      methodDescriptor_sdata_GETXGCDT,
      callback);
};


/**
 * @param {!proto.sdata.XGCDTReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sdata.sdataReply>}
 *     A native promise that resolves to the response
 */
proto.sdata.sdataPromiseClient.prototype.gETXGCDT =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sdata.sdata/GETXGCDT',
      request,
      metadata || {},
      methodDescriptor_sdata_GETXGCDT);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sdata.X2CReg,
 *   !proto.sdata.sdataReply>}
 */
const methodDescriptor_sdata_GETX2C = new grpc.web.MethodDescriptor(
  '/sdata.sdata/GETX2C',
  grpc.web.MethodType.UNARY,
  proto.sdata.X2CReg,
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.X2CReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sdata.X2CReg,
 *   !proto.sdata.sdataReply>}
 */
const methodInfo_sdata_GETX2C = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.X2CReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @param {!proto.sdata.X2CReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sdata.sdataReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sdata.sdataReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sdata.sdataClient.prototype.gETX2C =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sdata.sdata/GETX2C',
      request,
      metadata || {},
      methodDescriptor_sdata_GETX2C,
      callback);
};


/**
 * @param {!proto.sdata.X2CReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sdata.sdataReply>}
 *     A native promise that resolves to the response
 */
proto.sdata.sdataPromiseClient.prototype.gETX2C =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sdata.sdata/GETX2C',
      request,
      metadata || {},
      methodDescriptor_sdata_GETX2C);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sdata.X2CDTReg,
 *   !proto.sdata.sdataReply>}
 */
const methodDescriptor_sdata_GETX2CDT = new grpc.web.MethodDescriptor(
  '/sdata.sdata/GETX2CDT',
  grpc.web.MethodType.UNARY,
  proto.sdata.X2CDTReg,
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.X2CDTReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sdata.X2CDTReg,
 *   !proto.sdata.sdataReply>}
 */
const methodInfo_sdata_GETX2CDT = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.X2CDTReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @param {!proto.sdata.X2CDTReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sdata.sdataReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sdata.sdataReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sdata.sdataClient.prototype.gETX2CDT =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sdata.sdata/GETX2CDT',
      request,
      metadata || {},
      methodDescriptor_sdata_GETX2CDT,
      callback);
};


/**
 * @param {!proto.sdata.X2CDTReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sdata.sdataReply>}
 *     A native promise that resolves to the response
 */
proto.sdata.sdataPromiseClient.prototype.gETX2CDT =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sdata.sdata/GETX2CDT',
      request,
      metadata || {},
      methodDescriptor_sdata_GETX2CDT);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sdata.X2FReg,
 *   !proto.sdata.sdataReply>}
 */
const methodDescriptor_sdata_IMPX2F = new grpc.web.MethodDescriptor(
  '/sdata.sdata/IMPX2F',
  grpc.web.MethodType.UNARY,
  proto.sdata.X2FReg,
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.X2FReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sdata.X2FReg,
 *   !proto.sdata.sdataReply>}
 */
const methodInfo_sdata_IMPX2F = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.X2FReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @param {!proto.sdata.X2FReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sdata.sdataReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sdata.sdataReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sdata.sdataClient.prototype.iMPX2F =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sdata.sdata/IMPX2F',
      request,
      metadata || {},
      methodDescriptor_sdata_IMPX2F,
      callback);
};


/**
 * @param {!proto.sdata.X2FReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sdata.sdataReply>}
 *     A native promise that resolves to the response
 */
proto.sdata.sdataPromiseClient.prototype.iMPX2F =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sdata.sdata/IMPX2F',
      request,
      metadata || {},
      methodDescriptor_sdata_IMPX2F);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sdata.IMPRTReg,
 *   !proto.sdata.sdataReply>}
 */
const methodDescriptor_sdata_GETIMPRT = new grpc.web.MethodDescriptor(
  '/sdata.sdata/GETIMPRT',
  grpc.web.MethodType.UNARY,
  proto.sdata.IMPRTReg,
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.IMPRTReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sdata.IMPRTReg,
 *   !proto.sdata.sdataReply>}
 */
const methodInfo_sdata_GETIMPRT = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.IMPRTReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @param {!proto.sdata.IMPRTReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sdata.sdataReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sdata.sdataReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sdata.sdataClient.prototype.gETIMPRT =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sdata.sdata/GETIMPRT',
      request,
      metadata || {},
      methodDescriptor_sdata_GETIMPRT,
      callback);
};


/**
 * @param {!proto.sdata.IMPRTReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sdata.sdataReply>}
 *     A native promise that resolves to the response
 */
proto.sdata.sdataPromiseClient.prototype.gETIMPRT =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sdata.sdata/GETIMPRT',
      request,
      metadata || {},
      methodDescriptor_sdata_GETIMPRT);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sdata.CKFReg,
 *   !proto.sdata.sdataReply>}
 */
const methodDescriptor_sdata_REPORTCKF = new grpc.web.MethodDescriptor(
  '/sdata.sdata/REPORTCKF',
  grpc.web.MethodType.UNARY,
  proto.sdata.CKFReg,
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.CKFReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sdata.CKFReg,
 *   !proto.sdata.sdataReply>}
 */
const methodInfo_sdata_REPORTCKF = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sdata.sdataReply,
  /** @param {!proto.sdata.CKFReg} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.sdata.sdataReply.deserializeBinary
);


/**
 * @param {!proto.sdata.CKFReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sdata.sdataReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sdata.sdataReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sdata.sdataClient.prototype.rEPORTCKF =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sdata.sdata/REPORTCKF',
      request,
      metadata || {},
      methodDescriptor_sdata_REPORTCKF,
      callback);
};


/**
 * @param {!proto.sdata.CKFReg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sdata.sdataReply>}
 *     A native promise that resolves to the response
 */
proto.sdata.sdataPromiseClient.prototype.rEPORTCKF =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sdata.sdata/REPORTCKF',
      request,
      metadata || {},
      methodDescriptor_sdata_REPORTCKF);
};


module.exports = proto.sdata;

