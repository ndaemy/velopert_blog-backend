import Post from './models/post';

export default function createFakeData() {
  const posts = [...Array(40).keys()].map(i => ({
    title: `포스트 ${i}`,
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lorem nisi, varius et tellus sit amet, aliquam rhoncus lorem. Sed purus enim, mattis id nibh at, consequat finibus eros. Maecenas nibh purus, cursus sit amet urna et, commodo suscipit arcu. Morbi neque ante, tempor eu mattis id, tincidunt et enim. Etiam sed nulla arcu. Phasellus feugiat tortor nec nisi gravida, non mattis eros in.',
    tags: ['Fake', 'Data'],
  }));

  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  });
}
