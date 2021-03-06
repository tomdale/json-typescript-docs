import {
  DocSetManifest,
  TypeDocFilesJson,
  DocSetJsonApi,
  OutputRoot
} from './doc-interfaces';

import {
  slugify
} from './json-api-utils';

import {
  default as transformProjects,
  GLOBAL_ID_MAP
} from './transform-projects';
import { ProjectReflection } from 'typedoc';

export default function jsonApiTransform(manifest: DocSetManifest, projects: ProjectReflection[]): DocSetJsonApi {
  const {
    roots,
    resources
  } = transformProjects(projects);

  const root: OutputRoot = {
    data: {
      id: slugify(manifest.title),
      type: 'docset',
      attributes: {
        title: manifest.title,
        intro: manifest.intro,
        idMap: GLOBAL_ID_MAP
      },
      relationships: {
        docmodules: {
          data: roots
        }
      }
    },
    included: resources
  };
  return root;
}