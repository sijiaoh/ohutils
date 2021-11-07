import {css} from '@emotion/react';
import {CSSInterpolation} from '@emotion/serialize';
import {SiGoogle} from 'react-icons/si';

export type OauthLinksDetails = {
  provider: string;
  prefix?: string;
  postfix?: string;
  disabled?: boolean;
}[];

export const OauthLinksComponent = ({
  prefix,
  postfix,
  details,
}: {
  prefix?: string;
  postfix?: string;
  details?: OauthLinksDetails;
}) => {
  const dataList: {provider: string; icon: JSX.Element; name: string}[] = [
    {provider: 'google', icon: <SiGoogle />, name: 'Google'},
  ];

  return (
    <ul>
      {dataList.map(data => {
        const detail = details?.find(
          detail => detail.provider === data.provider
        );
        if (details != null && detail == null) return null;

        const linkCss: CSSInterpolation = detail?.disabled && {
          pointerEvents: 'none',
          textDecoration: 'none',
        };

        return (
          <li key={data.name}>
            <a
              href={`/api/signin/${data.provider}`}
              css={css({display: 'flex', alignItems: 'center'}, linkCss)}
            >
              <div css={{padding: '0.2em'}}>{data.icon}</div>
              <div>
                {prefix} {detail?.prefix} {data.name} {detail?.postfix}{' '}
                {postfix}
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};
