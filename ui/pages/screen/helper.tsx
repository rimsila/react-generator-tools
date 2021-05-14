import preview from './preview';

export function renderPreviewImage(type: string) {
  const item = preview.find(item => item.type === type && item.image);
  if (item) {
    return (
      <img
        src={preview.find(item => item.type === type)!.image}
        alt={type as string}
        style={{ width: '100%' }}
      />
    );
  }
  return <div>Sorry, no preview image yet</div>;
}
