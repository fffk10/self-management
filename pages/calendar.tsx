import Head from 'next/head'
import Layout from '../components/layout'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja';
import { JsxElement } from 'typescript';

/** props */
export interface CalendarProps {
}

const pageTitle = 'Calendar'

/**
 * Calendar page.
 * @param {CalendarProps} props   
 * @returns {JsxElement}
 */
export default function Calendar(props: CalendarProps) {
  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <section className='h-full'>
        <header className="bg-gray-300 shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{pageTitle}</h1>
          </div>
        </header>
        <div className="h-full mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth'
            }}
            locale={jaLocale}
            showNonCurrentDates={false}
            height={"90%"}
            initialEvents={[{ title: 'initial event', start: new Date() }]}
          />
        </div>
      </section>
    </Layout>
  );
}
