import { normalize } from '@angular-devkit/core';
import {
  apply,
  applyTemplates,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  strings,
  url,
} from '@angular-devkit/schematics';
import * as process from 'node:process';
import { Schema } from './schema';

export function generate(options: Schema): Rule {
  return async () => {
    return mergeWith(
      apply(url('./files'), [
        applyTemplates({
          classify: strings.classify,
          dasherize: strings.dasherize,
          name: options.name,
        }),
        move(
          normalize(
            `${process
              .cwd()
              .substring(
                process.cwd().indexOf('feature-sample-schematics') + 25
              )}/${options.name}`
          )
        ),
      ]),
      MergeStrategy.Overwrite
    );
  };
}
