import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import browser from 'webextension-polyfill';
import { toast } from '@/components/ui/use-toast';
import Editor, { example, modelUri } from '@/components/Rules/editor';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const RuleDialog = () => {
  const [value, setValue] = useState(JSON.stringify(example, null, 2));

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await browser.declarativeNetRequest.updateDynamicRules({
        addRules: [JSON.parse(value)],
      });
      return res;
    },
    onSuccess() {
      queryClient.invalidateQueries(['rules']);
    },
    onError(e: Error) {
      toast({
        description: e.message,
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add new rule</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Add new Rule</DialogTitle>
          <DialogDescription>
            Rules are used to modify network requests and responses.
          </DialogDescription>
        </DialogHeader>
        <Editor
          options={{
            minimap: { enabled: false },
          }}
          path={modelUri.toString()}
          height="400px"
          language="json"
          value={value}
          onChange={(v) => setValue(v ?? '')}
        />
        <DialogFooter>
          <Button
            onClick={() => {
              mutation.mutate();
            }}
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
