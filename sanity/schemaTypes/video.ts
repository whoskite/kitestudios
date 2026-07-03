import { defineField, defineType } from 'sanity'

export const videoType = defineType({
  name: 'portfolioVideo',
  title: 'Portfolio Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'disabled',
      title: 'Disabled',
      description: 'Toggle to disable and hide this video from the website.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      description: 'Upload the portfolio video file (Optional if using YouTube/Vimeo link below).',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'externalVideoUrl',
      title: 'External Video URL (YouTube / Vimeo)',
      description: 'Paste a link to a YouTube or Vimeo video (e.g. https://www.youtube.com/watch?v=...). If provided, this will be used instead of the uploaded file.',
      type: 'url',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image (Poster)',
      description: 'Thumbnail poster image used before video playback starts.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'project',
      title: 'Project / Client',
      type: 'reference',
      to: [{ type: 'project' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Campaign / Brand Film', value: 'Campaign / Brand Film' },
          { title: 'Commercial / Fashion', value: 'Commercial / Fashion' },
          { title: 'Event / Documentary', value: 'Event / Documentary' },
          { title: 'Event / Cinematic', value: 'Event / Cinematic' },
          { title: 'Corporate / Case Study', value: 'Corporate / Case Study' },
          { title: 'Product Showcase', value: 'Product Showcase' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Lower numbers display first.',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
