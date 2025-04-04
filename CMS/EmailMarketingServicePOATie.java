package CMS;

import org.omg.PortableServer.POA;

/**
 * Generated from IDL interface "EmailMarketingService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public class EmailMarketingServicePOATie
	extends EmailMarketingServicePOA
{
	private EmailMarketingServiceOperations _delegate;

	private POA _poa;
	public EmailMarketingServicePOATie(EmailMarketingServiceOperations delegate)
	{
		_delegate = delegate;
	}
	public EmailMarketingServicePOATie(EmailMarketingServiceOperations delegate, POA poa)
	{
		_delegate = delegate;
		_poa = poa;
	}
	public CMS.EmailMarketingService _this()
	{
		org.omg.CORBA.Object __o = _this_object() ;
		CMS.EmailMarketingService __r = CMS.EmailMarketingServiceHelper.narrow(__o);
		return __r;
	}
	public CMS.EmailMarketingService _this(org.omg.CORBA.ORB orb)
	{
		org.omg.CORBA.Object __o = _this_object(orb) ;
		CMS.EmailMarketingService __r = CMS.EmailMarketingServiceHelper.narrow(__o);
		return __r;
	}
	public EmailMarketingServiceOperations _delegate()
	{
		return _delegate;
	}
	public void _delegate(EmailMarketingServiceOperations delegate)
	{
		_delegate = delegate;
	}
	public POA _default_POA()
	{
		if (_poa != null)
		{
			return _poa;
		}
		return super._default_POA();
	}
	public java.lang.String[] getCustomerSegment(java.lang.String segmentCriteria)
	{
		return _delegate.getCustomerSegment(segmentCriteria);
	}

	public boolean sendCampaign(java.lang.String campaignId)
	{
		return _delegate.sendCampaign(campaignId);
	}

	public CMS.EmailCampaign getCampaign(java.lang.String campaignId)
	{
		return _delegate.getCampaign(campaignId);
	}

	public boolean createCampaign(CMS.EmailCampaign campaign)
	{
		return _delegate.createCampaign(campaign);
	}

}
