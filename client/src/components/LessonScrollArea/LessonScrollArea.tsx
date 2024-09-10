import * as React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Lesson } from '../../app/types/lesson'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
interface LessonScrollAreaProps {
  lessons: Lesson[]
}

export function LessonScrollArea({ lessons }: LessonScrollAreaProps) {
  return (
    <ScrollArea className='h-96 w-350 rounded-md border-2'>
      <div className='p-4'>
        <Accordion type='single' collapsible className='w-full'>
          {lessons.map((lesson) => (
            <AccordionItem key={lesson.id} value={lesson.id.toString()}>
              <AccordionTrigger>{lesson.title}</AccordionTrigger>
              <AccordionContent>
                <div className='text-sm'>{lesson.content}</div>
              </AccordionContent>
              {/* <Separator className='my-2' /> */}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ScrollArea>
  )
}
