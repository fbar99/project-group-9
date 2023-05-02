const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

// collection for org
const orgDataSchema = new Schema(
  {
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    collection: 'org'
  }
)

// collection for clients
const clientDataSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    phoneNumber: {
      primary: {
        type: String,
        required: true
      },
      alternate: {
        type: String
      }
    },
    address: {
      line1: {
        type: String
      },
      line2: {
        type: String
      },
      city: {
        type: String,
        required: true
      },
      county: {
        type: String
      },
      zip: {
        type: String
      }
    },
    orgs: {
      type: [{ type: String, ref: 'org' }],
      required: true,
      validate: [(org) => org.length > 0, 'needs at least one org']
    }
  },
  {
    collection: 'client',
    timestamps: true
  }
)

// collection for events
const eventDataSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    org: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    services: [
      {
        type: String,
        ref: 'service'
      }
    ],
    date: {
      type: Date,
      required: true
    },
    address: {
      line1: {
        type: String
      },
      line2: {
        type: String
      },
      city: {
        type: String
      },
      county: {
        type: String
      },
      zip: {
        type: String
      }
    },
    description: {
      type: String
    },
    attendees: [
      {
        type: String,
        ref: 'client'
      }
    ]
  },
  {
    collection: 'event'
  }
)

// collection for services
const serviceDataSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    name: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    org: {
      type: String, 
      ref: 'org' ,
      required: true,
    }
  },
  {
    collection: 'service'
  }
)

// collection for users
const userDataSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    email: {
      type: String,
      required: true,
      unique: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    org: {
      type: String, 
      ref: 'org' ,
      required: true,
    }
  },
  {
    collection: 'user',
    timestamps: true
  }
)

// hash the password
userDataSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userDataSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

// create models from mongoose schemas
const clients = mongoose.model('client', clientDataSchema)
const orgs = mongoose.model('org', orgDataSchema)
const events = mongoose.model('event', eventDataSchema)
const users = mongoose.model('user', userDataSchema)
const services = mongoose.model('service', serviceDataSchema)

// package the models in an object to export
module.exports = { clients, orgs, events, users, services }
