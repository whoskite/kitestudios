import { defineField, defineType } from 'sanity'

export const reelType = defineType({
  name: 'reel',
  title: 'Short Reel',
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
      description: 'Toggle to disable and hide this reel from the public website.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      description: 'Upload the 9:16 vertical video reel.',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description: 'Used as the thumbnail before video playback starts. Highly recommended for speed loading.',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Corporate / Brand', value: 'corporate' },
          { title: 'Medspa / Wellness', value: 'medspa' },
          { title: 'Fashion / Commercial', value: 'fashion' },
          { title: 'Product Showcase', value: 'product' },
          { title: 'Event Highlights', value: 'event' },
          { title: 'Fitness / Lifestyle', value: 'fitness' },
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
