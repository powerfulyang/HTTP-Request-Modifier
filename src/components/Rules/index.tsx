import { useQuery } from '@tanstack/react-query';
import browser from 'webextension-polyfill';
import { Toaster } from '@/components/ui/toaster';
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/Rules/columns';
import { RuleDialog } from '@/components/Rules/RuleDialog';

export const Rules = () => {
  const { data = [] } = useQuery({
    queryKey: ['rules'],
    queryFn: async () => {
      const res = await browser.declarativeNetRequest.getDynamicRules();
      return res;
    },
  });

  return (
    <div>
      <div className="p-4">
        <RuleDialog />
      </div>
      <div className="px-4">
        <DataTable data={data} columns={columns} />
      </div>
      <Toaster />
    </div>
  );
};
