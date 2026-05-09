"use client";

import React from "react";
import CodePreviewBlock from "../../components/docs/CodePreviewBlock";
import { Button, Container, Image, Text } from "@neuctra/ui";
import Metadata from "../../MetaData";
import CodeBlock from "../../components/docs/CodeBlock";
import { Check, X } from "lucide-react";
import DocsFooter from "../../components/docs/DocsFooter";

const ImageDocs = () => {
  return (
    <>
      <Metadata
        title="Image Component — Neuctra UI"
        description="Learn how to use the Image component in Neuctra UI — responsive, stylable images with overlays, aspect ratio, fallback, and interaction support."
        keywords="Neuctra UI Image, React Image component, responsive image, overlay, lazy loading, UI library"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Image Component
            </h1>
            <p className="text-sm leading-relaxed">
              The <span className="text-primary font-semibold">Image</span>{" "}
              component provides a responsive and stylable wrapper for images.
              Supports aspect ratios, overlays, fallback content, lazy loading,
              click interactions, shadows, borders, and custom styles — all with
              full TypeScript support.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock code={`import { Image } from "@neuctra/ui";`} />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage Code
            </h2>
            <p className="text-gray-300 mb-4">
              Start with a simple image. The component provides responsive and
              stylable image support with overlays, aspect ratios, and interactions.
            </p>
            <CodeBlock
              language="jsx"
              code={`import { Image } from '@neuctra/ui';

function BasicExample() {
  return (
    <Image 
      src="https://via.placeholder.com/300" 
      alt="Sample Image" 
      width={300} 
      height={200}
      className="rounded-lg"
    />
  );
}`}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Image src="https://via.placeholder.com/300" alt="Sample Image" width={300} height={200} />`}
              previewContent={
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-s9nPXndo9oLdDN5TyeS9UqRkx6--aqP_oA&s"
                  alt="Sample Image"
                  width={300}
                  height={200}
                />
              }
            />
          </section>

          {/* Advanced Examples */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Advanced Usage
            </h2>

            <div className="space-y-6">
              <CodePreviewBlock
                language="jsx"
                code={`<Image 
  src="https://via.placeholder.com/400" 
  alt="Overlay Example" 
  width={400} 
  height={250} 
  overlay={<span>Overlay Text</span>} 
  overlayColor="rgba(0,0,0,0.5)" 
/>`}
                previewContent={
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-s9nPXndo9oLdDN5TyeS9UqRkx6--aqP_oA&s"
                    alt="Overlay Example"
                    width={400}
                    height={250}
                    className="rounded-2xl overflow-hidden"
                    overlay={
                      <Container className="h-full flex flex-col justify-end p-5 gap-1 text-white transition-all duration-500">
                        <Text className="text-lg font-semibold tracking-tight">
                          Hello Developer!
                        </Text>

                        <Text className="text-sm text-gray-300">
                          I am container
                        </Text>

                        <Button
                          onClick={() => {
                            alert("You want to learn more ??");
                          }}
                          className="mt-3 w-fit"
                        >
                          Read More
                        </Button>
                      </Container>
                    }
                    overlayColor="rgba(0,0,0,0.65)"
                  />
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Image 
  src="https://via.placeholder.com/350" 
  alt="Rounded Shadow" 
  width={350} 
  height={200} 
  radius={16} 
  shadow 
  clickable 
  onClick={() => alert("Image clicked")} 
/>`}
                previewContent={
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-s9nPXndo9oLdDN5TyeS9UqRkx6--aqP_oA&s"
                    alt="Rounded Shadow"
                    width={350}
                    height={200}
                    radius={16}
                    shadow
                    clickable
                    onClick={() => alert("Image clicked")}
                  />
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Image 
  fallback={<div style={{ padding: 16, color: '#888' }}>No Image Available</div>} 
/>`}
                previewContent={
                  <Image
                    fallback={
                      <div style={{ padding: 16, color: "#888" }}>
                        No Image Available
                      </div>
                    }
                  />
                }
              />
            </div>
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Table
            </h2>
            <p className="text-gray-400 mb-3">
              All available props for the Image component.
            </p>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="text-left p-3">Prop</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Default</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3">src</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Image source URL.</td>
                  </tr>

                  <tr>
                    <td className="p-3">alt</td>
                    <td className="p-3">string</td>
                    <td className="p-3">""</td>
                    <td className="p-3">Alternative text for accessibility.</td>
                  </tr>

                  <tr>
                    <td className="p-3">title</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Tooltip text.</td>
                  </tr>

                  <tr>
                    <td className="p-3">width</td>
                    <td className="p-3">Responsive&lt;number | string&gt;</td>
                    <td className="p-3">"100%"</td>
                    <td className="p-3">
                      Width of the image (responsive supported).
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">height</td>
                    <td className="p-3">Responsive&lt;number | string&gt;</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Height of the image.</td>
                  </tr>

                  <tr>
                    <td className="p-3">aspectRatio</td>
                    <td className="p-3">number</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Maintain a fixed width/height ratio.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">radius</td>
                    <td className="p-3">number | string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Border radius for wrapper.</td>
                  </tr>

                  <tr>
                    <td className="p-3">border</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom border CSS value.</td>
                  </tr>

                  <tr>
                    <td className="p-3">shadow</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Enable shadow around image.</td>
                  </tr>

                  <tr>
                    <td className="p-3">opacity</td>
                    <td className="p-3">number</td>
                    <td className="p-3">1</td>
                    <td className="p-3">Opacity of the image.</td>
                  </tr>

                  <tr>
                    <td className="p-3">objectFit</td>
                    <td className="p-3">React.CSSProperties["objectFit"]</td>
                    <td className="p-3">"cover"</td>
                    <td className="p-3">Controls how the image fits.</td>
                  </tr>

                  <tr>
                    <td className="p-3">overlay</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Content displayed on top of the image.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">overlayColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"hsl(var(--background) / 0.6)"</td>
                    <td className="p-3">Overlay background color.</td>
                  </tr>

                  <tr>
                    <td className="p-3">clickable</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">
                      Makes image interactive (button-like).
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">onClick</td>
                    <td className="p-3">(e: MouseEvent) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Click event handler.</td>
                  </tr>

                  <tr>
                    <td className="p-3">fallback</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Content shown when no image is available (defaults to "No
                      Image").
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">loading</td>
                    <td className="p-3">"lazy" | "eager"</td>
                    <td className="p-3">"lazy"</td>
                    <td className="p-3">Image loading behavior.</td>
                  </tr>

                  {/* 🔥 Customization */}
                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Wrapper container classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">imageClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Classes for the &lt;img&gt; element.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">overlayClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for overlay container.</td>
                  </tr>

                  <tr>
                    <td className="p-3">fallbackClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for fallback container.</td>
                  </tr>

                  <tr>
                    <td className="p-3">style</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Wrapper inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">imageStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for image element.</td>
                  </tr>

                  <tr>
                    <td className="p-3">overlayStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for overlay.</td>
                  </tr>

                  <tr>
                    <td className="p-3">fallbackStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Inline styles for fallback container.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">...rest</td>
                    <td className="p-3">HTMLDivElement attributes</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      All native div props (id, data-*, aria-*, etc).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Common Mistakes
            </h2>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Image width="50px" height="50px" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Use responsive numbers or percentages, not raw CSS strings
                    for better consistency.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Image src="" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Always provide src or a fallback to avoid empty
                    placeholders.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>{'<Image className="rounded shadow" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Use className or style for visual adjustments.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>
            <div className="text-gray-200 space-y-3">
              <ul className="list-disc list-inside space-y-1">
                <li>Use aspectRatio to maintain consistent layouts.</li>
                <li>Apply radius and shadow for card-like styling.</li>
                <li>Use overlay for captions, badges, or hover effects.</li>
                <li>
                  Enable clickable with keyboard accessibility (Enter / Space).
                </li>
                <li>Use fallback to handle missing images gracefully.</li>
                <li>
                  Prefer lazy loading for performance on large image grids.
                </li>
              </ul>
            </div>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default ImageDocs;
