/*
 * Copyright 2017-2020 Samuel Rowe, Joel E. Rego
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const User = require("../model/user");
const httpStatus = require("../util/httpStatus");

function requireRole(role) {
    return (request, response, next) => {
        User.findById(request.user.identifier, (error, user) => {
            if (error) {
                throw error;
            }
            if (user.role !== role) {
                response.status(httpStatus.FORBIDDEN).json({
                    message: "The requested resource is forbidden.",
                });
            } else {
                next();
            }
        });
    };
}

module.exports = requireRole;
