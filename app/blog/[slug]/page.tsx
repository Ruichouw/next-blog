// app/blog/[slug]/page.tsx

type PageProps = {
  params: { slug: string };
};

export default function Page({ params }: PageProps) {
  // 这里直接把参数打印出来，方便在终端看
  console.log("Page props =", params);

  return (
    <main style={{ padding: 40 }}>
      <h1>动态路由测试</h1>
      <p>当前 slug: {String(params.slug)}</p>
    </main>
  );
}
