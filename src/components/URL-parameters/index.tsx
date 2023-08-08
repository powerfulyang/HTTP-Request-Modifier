import { useQuery } from '@tanstack/react-query';
import { ArrowDownUp, Star } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DataTable } from '@/components/data-table';
import { Input } from '@/components/ui/input';
import { extractURLParams } from '@/lib/extractURLParams';

interface Props {
  url?: string;
}

export const URLParameters: FC<Props> = ({ url: _url = '' }) => {
  const [url, setUrl] = useState(_url);
  const [recursiveKeys, setRecursiveKeys] = useState<string[]>([]);
  const [favoriteKeys, setFavoriteKeys] = useState<string[]>([]);
  const [recursive, setRecursive] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ['url-parameters', url, recursiveKeys, favoriteKeys, recursive],
    keepPreviousData: true,
    queryFn: () => {
      return extractURLParams(url, {
        recursiveKeys,
        favoriteKeys,
        recursive,
      });
    },
    select: (_data) => {
      return Array.from(Object.entries(_data)).map(([key, value]) => {
        return {
          key,
          value,
        };
      });
    },
  });

  return (
    <div className="w-[700px] p-4">
      <Input
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      <div className="mt-2 flex items-center space-x-2">
        <Switch id="recursive" checked={recursive} onCheckedChange={setRecursive} />
        <Label className="cursor-pointer" htmlFor="recursive">
          递归解析带 & 和 = 的 Value
        </Label>
      </div>
      <DataTable
        className="mt-2"
        data={data || []}
        columns={[
          {
            accessorKey: 'key',
            header: 'Key',
            // eslint-disable-next-line react/no-unstable-nested-components
            cell: ({ row }) => {
              const isFavorite = favoriteKeys.includes(row.original.key);
              const isRecursive = recursiveKeys.includes(row.original.key);
              const canRecursive =
                (row.original.value.includes('&') || row.original.value.includes('=')) &&
                !recursive;
              return (
                <div className="flex items-center space-x-2">
                  <Star
                    className="cursor-pointer"
                    size={15}
                    color={isFavorite ? '#f5c518' : undefined}
                    onClick={() => {
                      if (isFavorite) {
                        setFavoriteKeys(favoriteKeys.filter((key) => key !== row.original.key));
                      } else {
                        setFavoriteKeys([...favoriteKeys, row.original.key]);
                      }
                    }}
                  />
                  <span>{row.original.key}</span>
                  {canRecursive && (
                    <ArrowDownUp
                      className="cursor-pointer"
                      size={15}
                      color={isRecursive ? '#f5c518' : undefined}
                      onClick={() => {
                        if (isRecursive) {
                          setRecursiveKeys(recursiveKeys.filter((key) => key !== row.original.key));
                        } else {
                          setRecursiveKeys([...recursiveKeys, row.original.key]);
                        }
                      }}
                    />
                  )}
                </div>
              );
            },
          },
          {
            accessorKey: 'value',
            header: 'Value',
            // eslint-disable-next-line react/no-unstable-nested-components
            cell: ({ row }) => {
              return <span className="break-all">{row.original.value}</span>;
            },
          },
        ]}
      />
    </div>
  );
};
