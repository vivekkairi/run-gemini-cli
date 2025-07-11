/*
 * Copyright 2020 Google LLC
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

import { test } from 'node:test';
import assert from 'node:assert';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import * as core from '@actions/core';
import { randomFilepath } from '@google-github-actions/actions-utils';

import { run } from '../src/main';

test('#run', { concurrency: true }, async (suite) => {
  const originalEnv = Object.assign({}, process.env);

  suite.before(() => {
    suite.mock.method(core, 'debug', () => {});
    suite.mock.method(core, 'info', () => {});
    suite.mock.method(core, 'warning', () => {});
    suite.mock.method(core, 'setOutput', () => {});
    suite.mock.method(core, 'setSecret', () => {});
    suite.mock.method(core, 'group', () => {});
    suite.mock.method(core, 'startGroup', () => {});
    suite.mock.method(core, 'endGroup', () => {});
    suite.mock.method(core, 'addPath', () => {});
  });

  suite.beforeEach(async () => {
    const pth = randomFilepath(path.join(__dirname, '..', 'tmp'));
    await fs.mkdir(pth, { recursive: true });
    process.env.GITHUB_WORKSPACE = pth;
  });

  suite.afterEach(async () => {
    await fs.rm(process.env.GITHUB_WORKSPACE!, { force: true, recursive: true });
    process.env = Object.assign({}, originalEnv);
  });

  await suite.test('todo', async (t) => {
    await run();

    assert.ok(true); // TODO
  });
});
