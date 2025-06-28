const k8s = require('@kubernetes/client-node');
const fetch = require('node-fetch');

const kc = new k8s.KubeConfig();
kc.loadFromCluster(); // use loadFromDefault() if running locally
const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);
const coreV1 = kc.makeApiClient(k8s.CoreV1Api);

const GROUP = 'stable.dwk';
const VERSION = 'v1';
const PLURAL = 'dummysites';
const NAMESPACE = 'default';

async function main() {
  const watch = new k8s.Watch(kc);

  watch.watch(
    `/apis/${GROUP}/${VERSION}/namespaces/${NAMESPACE}/${PLURAL}`,
    {},
    async (type, obj) => {
      if (type === 'ADDED') {
        const name = obj.metadata.name;
        const url = obj.spec.website_url;
        console.log(`New DummySite detected: ${name}, fetching ${url}`);

        try {
          const html = await fetch(url).then(res => res.text());

          await coreV1.createNamespacedConfigMap(NAMESPACE, {
            metadata: { name: `${name}-html` },
            data: { 'index.html': html }
          });

          await coreV1.createNamespacedPod(NAMESPACE, {
            metadata: { name: `${name}-pod` },
            spec: {
              containers: [{
                name: 'nginx',
                image: 'nginx',
                volumeMounts: [{ mountPath: '/usr/share/nginx/html', name: 'html' }]
              }],
              volumes: [{
                name: 'html',
                configMap: { name: `${name}-html` }
              }]
            }
          });

          console.log(`DummySite ${name} created.`);
        } catch (err) {
          console.error(`❌ Failed to create DummySite ${name}:`, err);
        }
      }
    },
    err => console.error(err)
  );
}

main();
