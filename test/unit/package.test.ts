// Copyright (c) 2022 Robert Bosch GmbH
//
// This program and the accompanying materials are made available under the
// terms of the Apache License, Version 2.0 which is available at
// https://www.apache.org/licenses/LICENSE-2.0.
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.
//
// SPDX-License-Identifier: Apache-2.0

import 'mocha';
import mockfs from 'mock-fs';
import { readPackageManifest } from '../../src/modules/package';
import { PackageConfig } from '../../src/modules/project-config';

describe('package - module', () => {
    let envCache: any;
    before(() => {
        envCache = process.env;
        const mockfsConf: any = {
            '/my/custom/path/.velocitas/packages': {
                TestPackage: {
                    'v1.2.3': {
                        'manifest.json': '{}',
                    },
                },
            },
        };
        mockfs(mockfsConf, { createCwd: false });
    });
    describe('Package manifest', () => {
        it('should be loaded from VELOCITAS_HOME', () => {
            const packageConfig = new PackageConfig();
            packageConfig.name = 'TestPackage';
            packageConfig.version = 'v1.2.3';

            process.env = { VELOCITAS_HOME: '/my/custom/path' };

            readPackageManifest(packageConfig);
        });
    });
    after(() => {
        process.env = envCache;
        mockfs.restore();
    });
});
